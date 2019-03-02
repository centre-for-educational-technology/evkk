package ee.tlu.evkk.portal;

import ee.tlu.evkk.dal.dto.UserAccountFileView;
import ee.tlu.evkk.portal.dto.UserAccountFileOutput;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class PortalMapper {

    public abstract UserAccountFileOutput toUserAccountFileOutput(UserAccountFileView input);

    public abstract List<UserAccountFileOutput> toUserAccountFileOutput(List<UserAccountFileView> input);

}
